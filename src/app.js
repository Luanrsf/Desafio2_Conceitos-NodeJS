const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const {title,url,techs} = req.body;
  const repositorie = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0,
  };
  repositories.push(repositorie);
  return res.json(repositorie);

});

app.put("/repositories/:id", (req, res) => {
  const {id} =  req.params;
  const {title,url,techs} = req.body;
  const repositorieIndex = repositories.findIndex(repositorie=>repositorie.id==id);
  const likeCounter = repositories[repositorieIndex].likes;
  if(repositorieIndex<0){
    res.status(400).json({error:"Respositorie not found"});
  }
  const respositorie = {
    id,
    title,
    url,
    techs,
    like:likeCounter,
  }
  repositories[repositorieIndex] = respositorie;
  return res.status(201).json(respositorie);
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const repositorieIndex = repositories.findIndex(repositorie=>repositorie.id==id);
  if(repositorieIndex < 0){
    return res.status(400).json({error:"Repositorie not found"})
  }
  repositories.splice(repositorieIndex,1);
  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const {id} =  req.params;
  const repositorieIndex = repositories.findIndex(repositorie=>repositorie.id==id);
  if(repositorieIndex<0){
    res.status(400).json({error:"Respositorie not found"});
  }
  repositories[repositorieIndex].likes = repositories[repositorieIndex].likes + 1;
  const repositorie = repositories[repositorieIndex]
    return res.json(repositorie)
});

module.exports = app;
