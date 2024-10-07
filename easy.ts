export type MyPick<T, K> = {
    [E in (K extends keyof T ? K : never)]: T[E];
};

type testMyPickObject = {
    name: string;
    surname: string;
    age: number;
}
const _testMyPick: MyPick<testMyPickObject, "name" | "age" | "nonexistent"> = {
    name: "Ivan Pesnya",
    age: 10,
}

export type NOfArray<ArrayObj, N> = N extends keyof ArrayObj ? ArrayObj[N] : never;

type testNOfArrayObject = [1, 2, "3", 4, 5];
const _testNOfArray: NOfArray<testNOfArrayObject, 2> = "3";

export type Unshift<ArrayType, Element> = ArrayType extends readonly any[] ? [Element, ...ArrayType] : never;
const _testUnshift: Unshift<Number[], string> = ["hello", 1, 2, 3, 4, 5];

export type MyExclude<T, U> = T extends U ? never : T;
const _testMyExclude1: MyExclude<"a" | "b" | "c", "a" | "c"> = "b";
const _testMyExclude2: MyExclude<"a" | "b" | "c", "a"> = "b";
const _testMyExclude3: MyExclude<"a" | "b" | "c", "a"> = "c";
