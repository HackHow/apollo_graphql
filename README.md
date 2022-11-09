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

- 主要的檔案為 `src/app.ts` 作為 server 啟動的檔案。
- 啟動 server 所需要的參數 (resolvers, typeDefs) 從 `src/graphql` 這個資料夾引入。
- 由於此專案沒有使用到資料庫，所以資料是由自己透過 `.json` 的格式去做定義，因此將 .json 的檔案放在 `src/models` 的資料夾內。
- `util/utils` 內部主要是放其他程式可能會需要用到的 function，以這次專案為例，就將 jwt token 的簽證、驗證的 function 放入 util.ts。

## 3. api 的規格與範例

API 規格如圖：

本次測試的假資料一共有 2 筆，分別為

```
"account: "test1",
"password": "123456"

"account": "test2",
"password": "654321"
```

- 首先，需要對 login() 的 API 進行 query，在 `apollo server playground`，或是 `Postman` graphQL 的 Variables window 提供上方任一組帳號、密碼，驗證成功即可得到 accessToken。
- 獲得 token 之後，將其傳入圖片中的欄位 (如果使用 Postman 則是將其放入 Authorization 的 token，token type 記得要修改為 Bearer Token)
- 傳入 token 再對 me() 的 API 進行 query，可根據使用者想要得到什麼資訊去選取，圖片中是提供使用者的所有資訊

## 4. 整個過程的研究心得
