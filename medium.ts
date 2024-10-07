export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepPartialObject = {
    name: {
        first: string;
        second: string;
    };
    age: number;
};

const _testDeepPartialObject1: DeepPartial<DeepPartialObject> = {
    name: {
        second: "Pesnya",
    },
};
const _testDeepPartialObject2: DeepPartial<DeepPartialObject> = {
    name: {
        first: "Ivan",
    },
    age: 20,
};

export type MyCapitalize<T> = T extends string
    ? T extends `${infer F}${infer R}`
    ? `${Capitalize<F>}${R}`
    : T
    : never;

const _testCapitalize1: MyCapitalize<"hello" | "world"> = "Hello";
const _testCapitalize2: MyCapitalize<"hello" | "world"> = "World";

export type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ?
    DeepMutable<T[K]>
    : T[K];
};

interface TestDeepMutable {
    readonly age: number;
    readonly name: {
        readonly first: string;
        readonly second: string;
    }
}

let _testDeepMutable: DeepMutable<TestDeepMutable> = {
    age: 10,
    name: {
        first: "Ivan",
        second: "Pesnya",
    },
};

_testDeepMutable.age = 20;
_testDeepMutable.name.second = "Pesnya1";


export type ParseURLParams<StringElem> =
    StringElem extends `${string}:${infer P}/${infer R}`
    ? P | ParseURLParams<R>
    : StringElem extends `${string}:${infer P}`
    ? P
    : never;

type TestParseParams = ParseURLParams<'posts/:id/:user'>;
const testParseParams1: TestParseParams = "id";
const testParseParams2: TestParseParams = "user";
