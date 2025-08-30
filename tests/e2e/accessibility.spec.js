import { test, expect } from '@playwright/test';

test.describe('CFDP Questionnaire - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper headings hierarchy', async ({ page }) => {
    // Check main heading
    await expect(page.locator('h1')).toContainText('CFDP Questionnaire');
    
    // Check section heading
    await expect(page.locator('h2')).toContainText('Household Identification');
    
    // Check subsection heading
    await expect(page.locator('h3')).toContainText('GPS Coordinates');
  });

  test('should have proper form labels', async ({ page }) => {
    // Check if all inputs have associated labels
    const inputs = await page.locator('input[type="text"], input[type="number"], input[type="date"], input[type="tel"], select').all();
    
    for (const input of inputs) {
      const inputId = await input.getAttribute('id');
      if (inputId) {
        const label = page.locator(`label[for="${inputId}"]`);
        await expect(label).toBeVisible();
      }
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Start keyboard navigation
    await page.keyboard.press('Tab');
    
    // Should focus on first input
    let focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Tab through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    // Check primary text has good contrast
    const headingColor = await page.locator('h2').evaluate(el => {
      return getComputedStyle(el).color;
    });
    
    const backgroundColor = await page.locator('body').evaluate(el => {
      return getComputedStyle(el).backgroundColor;
    });
    
    // Basic check that colors are different
    expect(headingColor).not.toBe(backgroundColor);
  });

  test('should have focus indicators', async ({ page }) => {
    // Tab to first input
    await page.keyboard.press('Tab');
    
    // Check if focused element has visible focus indicator
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check if focus ring is present (outline or box-shadow)
    const focusStyle = await focusedElement.evaluate(el => {
      const style = getComputedStyle(el);
      return {
        outline: style.outline,
        boxShadow: style.boxShadow
      };
    });
    
    // Should have either outline or box-shadow for focus
    expect(focusStyle.outline !== 'none' || focusStyle.boxShadow !== 'none').toBeTruthy();
  });

  test('should have proper button labels', async ({ page }) => {
    // Check navigation buttons have descriptive text
    const nextButton = page.locator('button:has-text("Next")');
    await expect(nextButton).toBeVisible();
    
    const previousButton = page.locator('button:has-text("Previous")');
    // Previous button should be disabled on first step
    await expect(previousButton).toBeDisabled();
  });

  test('should work with screen reader patterns', async ({ page }) => {
    // Check for ARIA landmarks
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check for proper form structure
    const form = page.locator('form').or(page.locator('[role="form"]'));
    if (await form.count() > 0) {
      await expect(form.first()).toBeVisible();
    }
  });

  test('should handle high contrast mode', async ({ page }) => {
    // Simulate high contrast mode
    await page.addInitScript(() => {
      // Add high contrast media query
      const style = document.createElement('style');
      style.textContent = `
        @media (prefers-contrast: high) {
          * {
            border: 1px solid !important;
          }
        }
      `;
      document.head.appendChild(style);
    });
    
    await page.reload();
    
    // Verify page still functions
    await expect(page.locator('h1')).toContainText('CFDP Questionnaire');
    await expect(page.locator('h2')).toContainText('Household Identification');
  });

  test('should support reduced motion preference', async ({ page }) => {
    // Simulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Page should still be functional
    await page.fill('#barangay', 'Test Barangay');
    await page.click('button:has-text("Next")');
    
    // Should navigate without issues
    await expect(page.locator('h2')).toContainText('Head Profile');
  });
});