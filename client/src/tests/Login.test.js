import {login, isLoggedIn, logout, getToken} from "../services/UserActions";

describe("Login actions", () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({token: "exampletoken"}));
        login("admin", "admin", (x) => {});
    })
    it("Can log in", () => {
        expect(isLoggedIn()).toBeTruthy();
        expect(localStorage.getItem("userToken")).toBeTruthy();
    })
    it("Can log out", () => {
        logout();
        expect(isLoggedIn()).toBeFalsy();
        expect(localStorage.getItem("userToken")).toBeFalsy();
    })
    it("Can get the correct token", () => {
        expect(getToken()).toBe("exampletoken")
    })
})