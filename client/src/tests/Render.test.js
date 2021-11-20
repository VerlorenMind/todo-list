import React from 'react'
import {render, screen} from '@testing-library/react'
import Header from "../components/Header";
import {BrowserRouter} from "react-router-dom";

describe("Header testing", () => {
    it("Header text", () => {
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getAllByText("Todo Lists app")).toBeTruthy();
    })
})