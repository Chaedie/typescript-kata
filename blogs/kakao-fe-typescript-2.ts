// 출처 - 카카오 엔터 FE 기술 블로그 - https://fe-developers.kakaoent.com/2022/221124-typescript-tip/

// 1. Union Type
type Marvel = "IronMan" | "Hulk";
type Dc = "BatMan" | "SuperMan";

type Hero = Marvel | Dc;

const hero1: Hero = "Hulk";
const hero2: Hero = "BatMan";

// 2. Intersection Type
type FavoriteSport = "swimming" | "football";
type BallSport = "football" | "baseball";

type FavoriteBallSport = FavoriteSport & BallSport;

// 3. superset 과 subset
() => {
  type Title = string;
  type Webtoon = "트레이스" | "나 혼자만 레벨업";

  type W = Title & Webtoon; // type W = "트레이스" | "나 혼자만 레벨업"
};

() => {
  type Title = string;
  type Webtoon = "트레이스" | "나 혼자만 레벨업";

  type W = Title | Webtoon; // type W = string
};

// 4. Union Type 심화
() => {
  interface Webtoon {
    title: string;
    episode: number;
    isFinish: boolean;
  }

  interface WebNovel {
    title: string;
    episode: number;
    age: "all" | 12 | 15 | 19;
  }

  function printInfo(content: Webtoon | WebNovel) {
    // @ts-expect-error => Webtoon 에는 age 가 없다.
    console.log(content.age);
  }

  // in 키워드 사용
  function printInfo_2(content: Webtoon | WebNovel) {
    if ("isFinish" in content) {
      console.log(content.isFinish); // Webtoon
    } else {
      console.log(content.age); // WebNovel
    }
  }

  () => {
    // Tagged Union Types
    interface Webtoon {
      type: "webtoon";
      title: string;
      episode: number;
      isFinish: boolean;
    }

    interface WebNovel {
      type: "webNovel";
      title: string;
      episode: number;
      age: "all" | 12 | 15 | 19;
    }

    interface SF {
      type: "sf";
      title: string;
      episode: number;
      price: 3000;
    }

    function printInfo(content: Webtoon | WebNovel | SF) {
      switch (content.type) {
        case "webtoon":
          return content.isFinish; // Webtoon
        case "webNovel":
          return content.age; // WebNovel
        case "sf":
          return content.price; // SF
      }
    }
  };

  // TS 4.5 이상 => Template Literal Type 기능
  () => {
    interface Webtoon {
      type: `${string}Webtoon`; // Template Literal Types
      title: string;
      isFinish: boolean;
    }

    interface WebNovel {
      type: `${string}Novel`; // Template Literal Types
      title: string;
      age: "all" | 12 | 15 | 19;
    }

    function printInfo(content: Webtoon | WebNovel) {
      if (content.type === "KakaoWebtoon") {
        console.log(content.isFinish); // ✅ OK - content: Webtoon
      }
    }
  };
};

// 5. Intersection Type 심화
() => {
  () => {
    // Intersection - primitive type
    type T1 = 1 & number; // 1
    type T2 = "xxx" & string; // 'xxx'
    type T3 = true & boolean; // true

    // ! any => never 타입을 제외한 나머지는 any 가 되어 버린다.
    type T4 = any & 1; // any
    type T5 = any & boolean; // any
    type T6 = any & never; // never
  };
  () => {
    // Intersection - interface
    interface Paid {
      type: string;
    }
    interface Webtoon {
      title: string;
      episode: number;
    }
    type PaidWebtoon = Paid & Webtoon;

    const Trace: PaidWebtoon = {
      title: "trace",
      episode: 1,
      type: "rent",
    };
  };
  () => {
    // Intersection - interface - 2
    interface Paid {
      type: string; // !
    }
    interface Webtoon {
      title: string;
      episode: number;
      type: number; // !
    }
    type PaidWebtoon = Paid & Webtoon;

    const Trace: PaidWebtoon = {
      title: "trace",
      episode: 1,
      // @ts-expect-error: string & number is "never"
      type: "rent", // !
    };
  };
};

// 6. Template Literal Types
() => {
  () => {
    // type Content = "webtoon" | "novel";
    // type Content =
    //   | "series-webtoon"
    //   | "completed-webtoon"
    //   | "series-novel"
    //   | "completed-novel";
    type Content =
      | "series-webtoon"
      | "completed-webtoon"
      | "rest-webtoon"
      | "series-novel"
      | "completed-novel"
      | "rest-novel"
      | "series-book"
      | "completed-book"
      | "rest-book";
  };
  () => {
    type ContentType = "webtoon" | "novel" | "book";
    type Status = "series" | "completed" | "rest";
    // type Content = `${Status}-${ContentType}`;
    type Content = `${Status}${Capitalize<ContentType>}`;
  };
  () => {
    type Content<
      S1 extends string,
      S2 extends string
    > = `${S1}${Capitalize<S2>}`;
    type C1 = Content<"season", "vod">;

    type MouseEvent = "click" | "dblclick" | "mouseup" | "mousedown";
    type EventName = `on${Capitalize<MouseEvent>}Handler`;
  };
};

// 7. Object Literal 이 더 엄격하다
() => {
  interface Webtoon {
    title: string;
  }

  interface WebNovel {
    title: string;
    episodes: number;
  }

  () => {
    let trace: Webtoon = { title: "Trace" };
    let soloLeveling: WebNovel = { title: "Solo Leveling", episodes: 179 };

    trace = soloLeveling;
  };
  () => {
    const traceObj = { title: "Trace" };
    const trace: Webtoon = traceObj;
  };
  () => {
    // @ts-expect-error: 객체 리터럴로 직접 할당하면 좀 더 엄격하게 episode 가 Webtoon 에 없는 키라 타입에러가 발생한다.
    const trace: Webtoon = { title: "Trace", episode: 1 };
  };
};
