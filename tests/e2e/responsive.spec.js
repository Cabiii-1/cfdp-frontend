import { test, expect } from '@playwright/test';

test.describe('CFDP Questionnaire - Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Mobile Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

    test('should display mobile-optimized layout', async ({ page }) => {
      // Check if mobile layout is active
      await expect(page.locator('h1')).toContainText('CFDP Questionnaire');
      
      // Verify mobile stepper is visible
      await expect(page.locator('.md\\:hidden')).toBeVisible();
      
      // Check if form inputs are touch-friendly (44px minimum height)
      const inputs = page.locator('input[type="text"]').first();
      const inputBox = await inputs.boundingBox();
      expect(inputBox?.height).toBeGreaterThanOrEqual(44);
    });

    test('should navigate between form steps on mobile', async ({ page }) => {
      // Fill first section
      await page.fill('#barangay', 'Test Barangay');
      await page.fill('#municipality', 'Test Municipality');
      await page.fill('#province', 'Test Province');
      await page.fill('#region', 'Test Region');
      
      // Navigate to next step
      await page.click('button:has-text("Next")');
      
      // Verify we're on step 2
      await expect(page.locator('h2')).toContainText('Head Profile');
    });

    test('should toggle collapsible GPS section on mobile', async ({ page }) => {
      // Check if GPS section is collapsed initially
      const gpsToggle = page.locator('button:has-text("GPS Coordinates")');
      await expect(gpsToggle).toBeVisible();
      
      // Click to expand
      await gpsToggle.click();
      
      // Verify GPS inputs are now visible
      await expect(page.locator('#latitude')).toBeVisible();
      await expect(page.locator('#longitude')).toBeVisible();
    });
  });

  test.describe('Tablet Responsiveness', () => {
    test.use({ viewport: { width: 768, height: 1024 } }); // iPad size

    test('should display tablet-optimized stepper', async ({ page }) => {
      // Check if tablet stepper (scrollable) is visible
      const tabletStepper = page.locator('.hidden.md\\:flex.md\\:lg\\:hidden');
      await expect(tabletStepper).toBeVisible();
      
      // Verify step navigation is clickable
      const step2 = page.locator('text=Head Profile').first();
      await step2.click();
      await expect(page.locator('h2')).toContainText('Head Profile');
    });
  });

  test.describe('Desktop Responsiveness', () => {
    test.use({ viewport: { width: 1280, height: 720 } }); // Desktop size

    test('should display full desktop layout', async ({ page }) => {
      // Check if desktop stepper is visible
      const desktopStepper = page.locator('.hidden.lg\\:flex');
      await expect(desktopStepper).toBeVisible();
      
      // Verify all step labels are shown
      await expect(page.locator('text=Household Identification')).toBeVisible();
      await expect(page.locator('text=Head Profile')).toBeVisible();
      
      // Check if form has two-column layout
      const formGrid = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2');
      await expect(formGrid).toBeVisible();
    });

    test('should allow direct step navigation on desktop', async ({ page }) => {
      // Click directly on step 3
      await page.click('text=Household Composition');
      await expect(page.locator('h2')).toContainText('Household Composition');
    });
  });

  test.describe('Form Interaction Across Devices', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1280, height: 720 }
    ];

    viewports.forEach(({ name, width, height }) => {
      test(`should handle form submission on ${name}`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        
        // Fill out first section
        await page.fill('#barangay', 'Test Barangay');
        await page.fill('#municipality', 'Test City');
        await page.fill('#province', 'Test Province');
        await page.fill('#region', 'Test Region');
        await page.fill('#enumerator_name', 'Test Enumerator');
        await page.fill('#date_of_interview', '2024-01-01');
        await page.fill('#household_head_name', 'John Doe');
        await page.fill('#address', '123 Test Street');
        
        // Navigate through all steps quickly to reach review
        for (let i = 0; i < 9; i++) {
          const nextButton = page.locator('button:has-text("Next")');
          if (await nextButton.isVisible()) {
            await nextButton.click();
            await page.waitForTimeout(100); // Small delay for transitions
          }
        }
        
        // Should reach review page
        const reviewButton = page.locator('button:has-text("Review")');
        if (await reviewButton.isVisible()) {
          await reviewButton.click();
        }
        
        // Verify we're on review page
        await expect(page.locator('h1')).toContainText('Review & Submit');
      });
    });
  });

  test.describe('Touch and Click Interactions', () => {
    test('should handle touch events on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Test button press feedback
      const nextButton = page.locator('button:has-text("Next")');
      await nextButton.hover();
      await nextButton.click();
      
      // Verify navigation worked
      await expect(page.locator('h2')).toContainText('Head Profile');
    });

    test('should show proper focus states', async ({ page }) => {
      // Tab to first input
      await page.keyboard.press('Tab');
      
      // Check if input has focus
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Performance on Mobile', () => {
    test('should load quickly on mobile connection', async ({ page }) => {
      // Simulate slow 3G
      await page.route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
        await route.continue();
      });
      
      const startTime = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - startTime;
      
      // Should load within reasonable time even with network delay
      expect(loadTime).toBeLessThan(5000);
      
      // Check if main content is visible
      await expect(page.locator('h1')).toContainText('CFDP Questionnaire');
    });
  });
});