import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

import {beforeAll, afterAll} from '@jest/globals'

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

beforeEach(async () => {
    await driver.navigate().refresh()
    await (await driver).findElement(By.id('start-game')).click()
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();    
});

describe('clicking squares adds Xs', async () => {
    test('Clicking upper left square addes an X to the square', async () => {
        const box = await driver.findElement(By.id('cell-0'))
        await box.click()
        const boxText = await box.getText()
    
        expect(boxText).toContain('X')
        await driver.sleep(2000)
    })
    
    test('Clicking upper right square addes an X to the square', async () => {
        const box = await driver.findElement(By.id('cell-2'))
        await box.click()
    
        expect(await box.getText()).toContain('X')
        await driver.sleep(2000)
    
    })
    
    test('Clicking lower right square addes an X to the square', async () => {
        const box = await driver.findElement(By.id('cell-8'))
        await box.click()
    
        expect(await box.getText()).toContain('X')
        await driver.sleep(2000)
    
    })
})

test('computer adds an O when you add an X', async () => {
    await driver.findElement(By.id('cell-1')).click()
    const boxText = await driver.findElement(By.id('cell-0')).getText()

    expect(boxText).toContain('O')
    await driver.sleep(2000)
})