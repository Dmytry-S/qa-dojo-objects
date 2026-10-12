import { expect, Page } from "@playwright/test";
import path from "path";

export function inputUserData(page: Page) {
    return [
        {
            userInfo: {
                inputName: () => page.getByTestId("contact-name").fill("John"),
                inputEmail: () => page.getByTestId("contact-email").fill("sed@testi.com"),
                selectTheme: () => page.getByTestId("contact-subject").selectOption("bug"),
                selectPriority: () => page.getByTestId("contact-priority-high").click(),
                inputMessage: () => page.getByTestId("contact-message").fill("Text of message"),
                uploadFile: () => page.locator('input[type="file"]').setInputFiles(path.resolve(__dirname, "FOf.png")),
                sendEmailCopy: () => page.getByTestId("contact-copy-me").check(),
                sendMessage: () => page.getByTestId("contact-submit").click()
            },
            verify: async function(){
                await expect(page.getByTestId("contact-success")).toContainText("Дякуємо! 🎉");
            },

        },
        {
            userInfo: {
                inputName: () => page.getByTestId("contact-name").fill("John"),
                inputEmail: () => page.getByTestId("contact-email").fill("sed@testi.com"),
                inputMessage: () => page.getByTestId("contact-message").fill("Text of message"),
                sendMessage: () => page.getByTestId("contact-submit").click()
            },
            verify: async function(){
                await expect(page.getByTestId("contact-success")).toContainText("Дякуємо! 🎉");
            },
        },
        {
            userInfo: {
                selectTheme: () => page.getByTestId("contact-subject").selectOption("feature"),
                selectPriority: () => page.getByTestId("contact-priority-low").click(),
                uploadFile: () => page.locator('input[type="file"]').setInputFiles(path.resolve(__dirname, "FOf.png")),
                sendEmailCopy: () => page.getByTestId("contact-copy-me").check(),
                sendMessage: () => page.getByTestId("contact-submit").click()
            },
            verify: async function(){
                await expect(page.getByTestId("error-messages")).toContainText("name обов'язкове поле");
                await expect(page.getByTestId("error-messages")).toContainText("email некоректний email");
                await expect(page.getByTestId("error-messages")).toContainText("message обов'язкове поле");
            }
        }
    ]
}