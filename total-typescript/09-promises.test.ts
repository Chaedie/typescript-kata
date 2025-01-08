import { it } from "vitest";

interface LukeSkywalker {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export const fetchLukeSkywalker = async (): Promise<LukeSkywalker> => {
  const data = await fetch("https://swapi.py4e.com/api/people/1").then(
    (res) => {
      return res.json();
    }
  );

  return data;
};

it("no test in this file", () => {});