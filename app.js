let express = require("express");
let app = express();
let sqlite3 = require("sqlite3");
let path = require("path");
let dbpath = path.join(__dirname, "cricketMatchDetails.db");
console.log(dbpath);
let { open } = require("sqlite");
let db = null;
let main = (obj) => {
  console.log(obj.player_name);
  return {
    playerId: obj.player_id,
    playerName: obj.player_name,
  };
};
let initsevdb = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(400, () => {
      console.log(`server initalized at 400`);
    });
  } catch (e) {
    console.log(`error occured at ${e}`);
  }
};
initsevdb();
app.get("/players/", async (req, resp) => {
  let query = `select * from  player_details;`;
  let res = await db.all(query);
  resp.send(
    res.map((eachMovie) => ({
      playerId: eachMovie.player_id,
      playerName: eachMovie.player_name,
    }))
  );
});

module.exports = app;
