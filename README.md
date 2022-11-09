[Project URL](https://github.com/HackHow/apollo_graphql)

## 1. 程式啟動方式

step1

```
$ git clone https://github.com/HackHow/apollo_graphql.git
```

```
$ npm install
```

step2

進入專案的檔案夾，建立 .env 檔，將 .env.example 內的變數複製過去，自行將變數填入值即可

step3

```
$ npm run start
```

就可以進入到 [Apollo-server playground](http://localhost:4000/) 進行 API 測試

## 2. 程式架構

整體的程式架構，如圖：

![apollo_graphql_tree](https://user-images.githubusercontent.com/56557271/200731156-0dc061a5-9995-4062-be0a-a91dd9262e3c.JPG)

- 主要的檔案為 `src/app.ts` 作為 server 啟動的檔案。
- 啟動 server 所需要的參數 (resolvers, typeDefs) 從 `src/graphql` 這個資料夾引入。
- 由於此專案沒有使用到資料庫，所以資料是由自己透過 `.json` 的格式去做定義，因此將 .json 的檔案放在 `src/models` 的資料夾內。
- `util/utils` 內部主要是放其他程式可能會需要用到的 function，以這次專案為例，就將 jwt token 的簽證、驗證的 function 放入 util.ts。

## 3. api 的規格與範例

API 規格如圖：

![API_example](https://user-images.githubusercontent.com/56557271/200731538-42fa5a3e-6846-4bf9-b591-9e9ba8b23d34.JPG)

本次測試的假資料一共有 2 筆，分別為

```
"account: "test1",
"password": "123456"

"account": "test2",
"password": "654321"
```

- 首先，需要對 `login()` 的 API 進行 query，在 `apollo server playground` (該環境可以透過滑鼠取選取要 input 的參數，再自己去修改參數的值即可)，或是 `Postman` GraphQL 的 Variables window 輸入上方任一組帳號、密碼，驗證成功即可得到 **accessToken**。

- 獲得 token 之後，將其傳入圖片中的欄位 (如果是使用 `Postman` 進行測 ˋ 是， 則是將其放入 Authorization 的 **Token**，Type 記得要修改為 **Bearer Token**)

- 傳入 token 再對 `me()` 的 API 進行 query，可根據使用者想要得到什麼資訊去選取，圖片中是提供使用者的所有資訊

## 4. 整個過程的研究心得

### 整個過程:

一開始收到作業時，確認 API 需要的資料格式後，就先去研究 TypeScript 該怎麼寫，大概知道怎麼去定義型別之後，就去研究 Apollo server，發現到 Apollo 這個套件幫我們做了非常多的事情，所以我可以很快地往 GraphQL 去做研究，過程大概是這樣： _**TypeScript >> Apollo server >> GraphQL**_

在過程中其實有發現到網路上的例子很多都是使用 **apollo-server-express** 這個套件。在時間沒有那麼多的情況下，我自己則是使用 **apollo-server**，其實我沒有仔細研究兩者差異在哪。但 apollo-server 的官方文件在 Get started 就寫得滿清楚的，主要就是透過官方文件和網路上的一些範例去了解到 GraphQL 的寫法，以及如何套用在 Apollo server

### 研究心得:

第一次嘗試寫 TypeScript 和 GraphQL，在程式的架構上跟過往撰寫過的 RESTful API 差滿多的。過往都是都會使用 Exprss 去區分 **_`routers`_**、**_`controllers`_**、**_`models`_**，雖然 Apollo server 也是使用 Express，但寫法上就落差滿大的。再加上這次沒有使用到 Database，在 models 這層資料夾也僅有存放 `.json` 的假資料，至於 controller 的部分不太熟悉 GraphQL 要怎麼去拆分，都是寫在 `resolvers.ts` 檔案裡面，且 resolvers 是 Apollo server 需要引入的參數，所以就沒有再另外開 controllers 的資料夾。

除了學習以上新工具之外，最讓我不習慣的還是 TypeScript，過往在 JS 能夠執行的程式碼，換成 TS 就不行了，研究很久型別該怎麼去定義，以及為什麼定義了卻還發生錯誤，花了比較多時間。雖然最後程式可以執行，但不確定型別定義的好不好。至於錯誤處理的機制只有大概看一下，沒有花太多的時間在上面，還是盡量以 API 能夠被使用為優先
