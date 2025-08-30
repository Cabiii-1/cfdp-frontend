import { test, expect } from '@playwright/test';

test.describe('CFDP Questionnaire - Form Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete entire questionnaire flow', async ({ page }) => {
    // Step 1: Household Identification
    await expect(page.locator('h2')).toContainText('Household Identification');
    
    await page.fill('#barangay', 'Barangay San Jose');
    await page.fill('#municipality', 'Quezon City');
    await page.fill('#province', 'Metro Manila');
    await page.fill('#region', 'NCR');
    await page.fill('#enumerator_name', 'Maria Santos');
    await page.fill('#date_of_interview', '2024-01-15');
    await page.fill('#household_head_name', 'Juan dela Cruz');
    await page.fill('#contact_number', '+639123456789');
    await page.fill('#address', '123 Sampaguita Street, Barangay San Jose');
    
    // Test GPS functionality if available
    const gpsButton = page.locator('button:has-text("Use current location")');
    if (await gpsButton.isVisible()) {
      // Mock geolocation
      await page.addInitScript(() => {
        navigator.geolocation = {
          getCurrentPosition: (success) => {
            success({
              coords: {
                latitude: 14.6091,
                longitude: 121.0223
              }
            });
          }
        };
      });
      
      await gpsButton.click();
      await page.waitForTimeout(1000);
      
      // Check if coordinates were filled
      const latValue = await page.locator('#latitude').inputValue();
      const lngValue = await page.locator('#longitude').inputValue();
      expect(latValue).not.toBe('');
      expect(lngValue).not.toBe('');
    }
    
    await page.click('button:has-text("Next")');

    // Step 2: Head Profile  
    await expect(page.locator('h2')).toContainText('Head Profile');
    
    await page.fill('#name', 'Juan dela Cruz');
    await page.fill('#age', '45');
    await page.selectOption('#sex', 'Male');
    await page.selectOption('#civil_status', 'Married');
    await page.selectOption('#educational_attainment', 'High school graduate');
    await page.fill('#occupation', 'Tricycle Driver');
    await page.fill('#monthly_income', '15000');
    await page.fill('#religion', 'Roman Catholic');
    await page.fill('#ethnicity', 'Filipino');
    
    // Check special status if needed
    await page.check('#senior_citizen');
    
    await page.click('button:has-text("Next")');

    // Step 3: Household Composition (placeholder)
    await expect(page.locator('h2')).toContainText('Household Composition');
    await page.click('button:has-text("Next")');

    // Continue through remaining steps
    const remainingSteps = [
      'Housing Conditions',
      'Health & Nutrition', 
      'Education',
      'Livelihood & Income',
      'Disaster Preparedness',
      'Cultural Participation',
      'Feedback & Aspirations'
    ];

    for (const stepTitle of remainingSteps) {
      await expect(page.locator('h2')).toContainText(stepTitle);
      await page.click('button:has-text("Next")');
    }

    // Should now be on review page
    const reviewButton = page.locator('button:has-text("Review")');
    if (await reviewButton.isVisible()) {
      await reviewButton.click();
    }

    // Verify review page
    await expect(page.locator('h1')).toContainText('Review & Submit');
    await expect(page.locator('text=Household Identification')).toBeVisible();
    await expect(page.locator('text=Head Profile')).toBeVisible();
    
    // Test export functionality
    await page.click('button:has-text("Export")');
    
    // Test back to form
    await page.click('button:has-text("Back to Form")');
    await expect(page.locator('h2')).toContainText('Household Identification');
  });

  test('should validate required fields', async ({ page }) => {
    // Try to proceed without filling required fields
    await page.click('button:has-text("Next")');
    
    // Should still be on first step due to validation
    await expect(page.locator('h2')).toContainText('Household Identification');
    
    // Fill minimum required fields
    await page.fill('#barangay', 'Test Barangay');
    await page.fill('#municipality', 'Test City');
    await page.fill('#province', 'Test Province');  
    await page.fill('#region', 'Test Region');
    await page.fill('#enumerator_name', 'Test Enumerator');
    await page.fill('#date_of_interview', '2024-01-01');
    await page.fill('#household_head_name', 'Test Head');
    await page.fill('#address', 'Test Address');
    
    // Now should be able to proceed
    await page.click('button:has-text("Next")');
    await expect(page.locator('h2')).toContainText('Head Profile');
  });

  test('should allow step navigation', async ({ page, viewport }) => {
    // Skip on mobile where direct step navigation isn't available
    if (viewport && viewport.width < 768) {
      test.skip();
    }
    
    // Fill first step minimally
    await page.fill('#barangay', 'Test');
    await page.fill('#municipality', 'Test');
    await page.fill('#province', 'Test');
    await page.fill('#region', 'Test');
    await page.fill('#enumerator_name', 'Test');
    await page.fill('#date_of_interview', '2024-01-01');
    await page.fill('#household_head_name', 'Test');
    await page.fill('#address', 'Test');
    
    // Click directly on step 3 (if visible)
    const step3 = page.locator('text=Household Composition').first();
    if (await step3.isVisible()) {
      await step3.click();
      await expect(page.locator('h2')).toContainText('Household Composition');
    }
  });

  test('should persist form data between steps', async ({ page }) => {
    // Fill data in step 1
    await page.fill('#barangay', 'Persistent Barangay');
    await page.fill('#municipality', 'Persistent City');
    await page.fill('#province', 'Persistent Province');
    await page.fill('#region', 'Persistent Region');
    await page.fill('#enumerator_name', 'Persistent Enumerator');
    await page.fill('#date_of_interview', '2024-01-01');
    await page.fill('#household_head_name', 'Persistent Head');
    await page.fill('#address', 'Persistent Address');
    
    // Go to next step
    await page.click('button:has-text("Next")');
    
    // Go back to previous step
    await page.click('button:has-text("Previous")');
    
    // Verify data persisted
    await expect(page.locator('#barangay')).toHaveValue('Persistent Barangay');
    await expect(page.locator('#municipality')).toHaveValue('Persistent City');
    await expect(page.locator('#enumerator_name')).toHaveValue('Persistent Enumerator');
  });
});