import React from 'react'
import {render, screen} from '@testing-library/react'
import Header from "../components/Header";
import {BrowserRouter} from "react-router-dom";

describe("Header testing", () => {
    beforeEach(() => {
        render(<BrowserRouter><Header/></BrowserRouter>)
    })
    it("Header text", () => {
        expect(screen.getAllByText("Todo Lists app")).toBeTruthy();
    })

    it("Header login button", () => {
        expect(screen.getAllByText("Log In")).toBeTruthy();
    })
})