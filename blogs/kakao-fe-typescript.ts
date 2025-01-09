// 출처 - https://fe-developers.kakaoent.com/2021/211012-typescript-tip/
// 1. enum < union type

type Fruit = "apple" | "banana" | "orange";

function FruitDetail({ fruit }: { fruit: Fruit }) {
  return fruit;
}

FruitDetail({ fruit: "apple" });

// 2. mapped type
const PRICE_MAP: { [fruit in Fruit]: number } = {
  apple: 1000,
  banana: 1500,
  orange: 2000,
  // @ts-expect-error: asdf is not in Fruit
  asdf: 2000,
};

function getDiscountedPrice(fruit: Fruit, discount: number) {
  return PRICE_MAP[fruit] - discount;
}

// 3. type guard
function getAgeText(age: number | string) {
  if (typeof age === "number") {
    return age.toFixed(2);
  } else {
    return age.trim();
  }
}

// 3.1. type guard - in
() => {
  interface Person {
    name: string;
    age: number;
  }

  interface Product {
    name: string;
    price: number;
  }

  function toString(value: Person | Product) {
    if ("age" in value) {
      return `${value.name} ${value.age}세`;
    } else {
      return `${value.name} ${value.price}원`;
    }
  }
};

// 3.2. type guard - in, type
() => {
  interface Person {
    type: "Person";
    name: string;
    age: number;
  }

  interface Product {
    type: "Product";
    name: string;
    price: number;
  }
  interface Building {
    type: "Building";
    name: string;
    location: string;
  }

  function toString(value: Person | Product | Building) {
    switch (value.type) {
      case "Person":
        return `${value.name} ${value.age}`;
      case "Product":
        return `${value.name} ${value.price}`;
      case "Building":
        return `${value.name} ${value.location}`;
    }
  }
};
