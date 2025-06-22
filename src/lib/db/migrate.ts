export const migrate = () => {
  console.log("");
  // const resourcePath = await resourceDir();
  // const files = await readDir(await join(resourcePath, "migrations"));
  // let migrations = files.filter((file) => file.name?.endsWith(".sql"));

  // migrations = migrations.sort((a, b) => {
  //   const aHash = a.name?.replace(".sql", "").slice(0, 4);
  //   const bHash = b.name?.replace(".sql", "").slice(0, 4);

  //   if (aHash && bHash) {
  //     return aHash.localeCompare(bHash);
  //   }

  //   return 0;
  // });

  // const migrationTableCreate = /*sql*/ `
  // 	CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
  //           id INTEGER PRIMARY KEY AUTOINCREMENT,
  //           hash text NOT NULL UNIQUE,
  // 		created_at numeric
  // 	)
  // `;

  // await sqlite.execute(migrationTableCreate, []);

  // for (const migration of migrations) {
  //   const hash = migration.name?.replace(".sql", "");

  //   const dbMigrations = await sqlite
  //     .select(
  //       /*sql*/ `SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC`,
  //     )
  //     .then(
  //       (data) => data as { id: number; hash: string; created_at: number }[],
  //     );

  //   const hasBeenRun = (hash: string) =>
  //     dbMigrations.find((dbMigration) => {
  //       return dbMigration?.hash === hash;
  //     });

  //   if (hash && hasBeenRun(hash) === undefined) {
  //     const sql = await readTextFile(
  //       await join(resourcePath, "migrations", migration.name),
  //     );

  //     await sqlite.execute(sql, []);
  //     await sqlite.execute(
  //       /*sql*/ `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
  //       [hash, Date.now()],
  //     );
  //   }
  // }

  // console.info("Migrations complete");

  // return Promise.resolve();
};
