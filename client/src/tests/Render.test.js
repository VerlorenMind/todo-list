import React from 'react'
import {render, screen} from '@testing-library/react'
import Header from "../components/Header";
import List from "../components/List"
import {BrowserRouter} from "react-router-dom";
import Profile from "../components/Profile";

describe("Header testing", () => {
    beforeEach(() => {
        render(<BrowserRouter><Header/></BrowserRouter>)
    })
    it("Header text", () => {
        expect(screen.getAllByText("Todo Lists app")).toBeTruthy();
    })

    it("Header login button", () => {
        expect(screen.getAllByText("Log in")).toBeTruthy();
    })
})

describe("Profile page testing", () => {
    beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify([{id: 1,  name: "List 1"}, {id: 2, name: "List 2"}]))
        render(<BrowserRouter><Profile/></BrowserRouter>)
    })
    it("Has a link to new list creation", () => {
        expect(screen.getByText("Create new list").href).toContain('/create-list');
    })
    it("Has lists on screen", () => {
        let list1 = screen.getByText("List 1")
        let list2 = screen.getByText("List 2")
        expect(list1).toBeTruthy();
        expect(list1.href).toContain('/list/1')
        expect(list2).toBeTruthy()
        expect(list2.href).toContain('/list/2')
    })
})

describe("List page testing", () => {
    beforeEach(() => {
        const match = { params: { id: 1 } }
        fetch.mockResponseOnce(JSON.stringify({ name: "Cool List",
            items: [{id: 1,  contents: "Cool item 1"}, {id: 2, contents: "Cool item 2"}]}))
        render(<BrowserRouter><List match={match}/></BrowserRouter>)
    })
     it("Correct list is shown", () => {
         expect(screen.getAllByText("Cool List")).toBeTruthy()
         expect(screen.getAllByText("Cool item 1")).toBeTruthy()
         expect(screen.getAllByText("Cool item 2")).toBeTruthy()
     })
})