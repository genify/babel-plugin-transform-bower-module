let expect = require('chai').expect;
let babel = require('babel-core');

describe("plugin", () => {

    it("should be ok to resolve bower module", () => {
        let code = `
            import { Model } from "edu-framework";
            export { Module } from "edu-framework";
        `;
        let ret = babel.transform(code,{
            "plugins": ['./lib/index.js']
        });
        console.log(ret.code);
    });

});

