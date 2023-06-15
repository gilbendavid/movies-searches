const axios = require("axios");
const { expect } = require("chai");
const {expectedResultForToySearch} = require("../mockData/ResultsForToy");
const {baseUrl, getAllMoviesTitlesRequest } = require('../consts');

// Should be getting random relevent word, from existing data, to make sure testing is proper
// currently using data which was asked in question
// should be using proper report system for easier maintance

// lodash instead?
function areArraysEqual (arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return {result: false, message: `Arrays are not equal, arr1 length: ${arr1.length}, arr2 length: ${arr2.length}`};
    }
    for(let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return {result: false, message: `Arrays are not equal, arr1[${i}]: ${arr1[i]}, arr2[${i}]: ${arr2[i]}`};
        }
    }

    return {result: true, message: `Arrays are equal`};
}

describe("Get Movies By String Test", async () => {
    it("should be able to get movies by toy", async () => {
        const filterValue = 'toy';
        const fullUrl = `${baseUrl}${getAllMoviesTitlesRequest}${filterValue}`;
        const res = await axios.get(fullUrl);

        // having utils for erros messages will make it more reusable & test more readable
        expect(res.status).equal(200,`Status code is not 200, status: ${res.status},
                         response error: ${res.message} filterValue: ${filterValue},
                          full Url: ${fullUrl}`);

        const toys = res.data.result;
        const areArraysEqualResult = areArraysEqual(toys, expectedResultForToySearch);
        expect(areArraysEqualResult.result).equal(true, areArraysEqualResult.message);
    })
})

describe("Get moves should return nothing", async () => {
    it("should be able to get movies by toy", async () => {
        const filterValue = 'jdsfkjdsfkjdsfds';
        const fullUrl = `${baseUrl}${getAllMoviesTitlesRequest}${filterValue}`;
        const res = await axios.get(fullUrl);

        // having utils for erros messages will make it more reusable & test more readable
        console.log(res.data);
        expect(res.status).equal(200,`Status code is not 200, status: ${res.status},
                         response error: ${res.message} filterValue: ${filterValue},
                          full Url: ${fullUrl}`);
    })
})