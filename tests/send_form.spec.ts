import { test } from "@playwright/test";
import { inputUserData } from "./user-data";

test("TC-001, Send Message", async ({ page })=> {
    await page.goto("/contact");
    for (const data of inputUserData(page)) {
        for (const action of Object.values(data.userInfo)) {
            await action();
        };
        await data.verify();
        await page.getByTestId("nav-home").click();
        await page.getByTestId("footer-link-contact").click();
    }
});
