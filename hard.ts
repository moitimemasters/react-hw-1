type Camelize<ObjType> = ObjType extends object
    ? {
        [K in (keyof ObjType & string) as ToCamelCase<K>]: Camelize<ObjType[K]>;
    }
    : ObjType;

type ToCamelCase<S extends string> = S extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<ToCamelCase<R>>}`
    : S;

type SnakeCaseTest = {
    first_name: string;
    last_name: string;
    nested_property: {
        inner_value: number;
        another_property: {
            deep_property: boolean;
        };
    };
};

const testCamelize: Camelize<SnakeCaseTest> = {
    firstName: "Ivan",
    lastName: "Pesnya",
    nestedProperty: {
        innerValue: 1,
        anotherProperty: {
            deepProperty: true,
        },
    },
}




type Split<S extends string, D extends string> =
    string extends S ? string[] :
    S extends '' ? [] :
    S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

type DeepPick<T, Path extends string> =
    Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
    ? { [K in Key]: DeepPick<T[K], Rest> }
    : never
    : Path extends keyof T
    ? { [K in Path]: T[K] }
    : never;


type DeepPickExample = {
    a: {
        b: {
            c: number;
        };
        d: string;
    };
    e: boolean;
};

const testDeepPick1: DeepPick<DeepPickExample, 'a.b.c' | 'a.d'> = {
    a: {
        b: {
            c: 1,
        }
    }
}

const testDeepPick2: DeepPick<DeepPickExample, 'a.b.c' | 'a.d'> = {
    a: {
        d: "abacaba",
    }
}
