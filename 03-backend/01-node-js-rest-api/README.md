# README

1. Membuat file `package.json`:
   A. `npm init --y`
   B. Bikin manual `touch package.json`
2. Install required dependencies
   A. Reguler Dependencies: `npm i [package]` / `npm i --save [package]` | express
   B. Development Dependencies: `npm i -D [package]` / `npm i --save-dev [package]` | typescript, @types/node, tsx, @types/express
3. Buat entry file `src/index.ts` | `src/app.ts` | `src/server.ts`
4. Buat server di dalam entry file
5. Buat script `dev` di `package.json` isi dengan `tsx --watch src/index.ts`
