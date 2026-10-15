// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */


  const config = ({ 
    
  testDir: './tests',
  timeout: 70*1000,
  expect: 
  {
   timeout: 6000,
  },
  reporter: 'html',
  use:
  {
    browserName: 'chromium',
    headless : true,
    screenshot : 'on',
    trace : 'retain-on-failure',  // off , on  'retain-on-failure'
    //trace : 'on-first-retry',
    
  }
  });
  module.exports =config
