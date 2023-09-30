//This will tell the TS compiler that there are some types located here, use those
/// <reference types="vitest/globals" />
//This is creating the JS dom env, the react components will think that they are in the browser eventhough they're running in the node env
import "@testing-library/jest-dom"
