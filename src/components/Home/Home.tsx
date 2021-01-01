import React from 'react';
import './Home.css';
import Carousel from "react-material-ui-carousel";
import {List, ListItem, Paper} from "@material-ui/core";
import {Col, Row} from "react-bootstrap";

function Item(props)
{
    return (
        <Paper>
            <img src={props.item.img}/>
            <h2>{props.item.description}</h2>
        </Paper>
    )
}

export default function Home (){

    const items = [
        {
            img: "https://fr.web.img6.acsta.net/img/69/b6/69b63078ebcd74a304a0ac2557d4297a.jpg",
            description: "Pourquoi les films de Noël sont-ils si populaires ?"
        },
        {
            img: "https://fr.web.img2.acsta.net/img/ca/3e/ca3edd5022431e52131732d58f3dcca4.jpg",
            description: "Dans le respect du traditionnel film de sabre chinois"
        },
        {
            img: "https://fr.web.img4.acsta.net/img/9f/13/9f13404c597e8a1681194475ea738ab6.jpg",
            description: "Quels acteurs apparaissent le plus dans des téléfilms de Noël ?"
        },
        {
            img: "https://fr.web.img6.acsta.net/img/47/54/47546da0ce869e7de98a5a62b7254d4c.jpg",
            description: "The Prom : l'interview de l'équipe du film"
        }
    ]
    const newsList = [
        {
            description: "Avatar 2"
        },
        {
            description: "Mourir peut attendre"
        },
        {
            description: "Nobody",
        },
        {
            description: "Monster Hunter"
        },
        {
            description: "Marvel Sony Untitled Spider-Man: Far From Home Sequel"
        },
        {
            description: "Dune"
        },
        {
            description: "Mystère"
        },
        {
            description: "Sound of Metal"
        },
        {
            description: "Slam"
        },
    ]
    const newsList2 = [
        {
            img: "https://fr.web.img5.acsta.net/r_640_360/newsv7/20/12/14/14/47/1526446.jpg",
            description: "Décès John le Carré : James Bond ? \"Un fasciste !\" pour cet ancien vrai espion "
        },
        {
            img: "https://fr.web.img6.acsta.net/r_640_360/newsv7/20/12/14/15/40/3944547.jpg",
            description: "Le Grand bleu et Léon versions longues sur Amazon Prime : quoi de neuf sur la table de montage ?"
        },
        {
            img: "https://fr.web.img5.acsta.net/r_640_360/newsv7/20/12/14/12/52/0859453.jpg",
            description: "Nominations Lumières 2021 : Deux, Les choses qu’on dit, les choses qu’on fait en tête"
        },
        {
            img: "https://fr.web.img4.acsta.net/r_640_360/newsv7/20/12/14/11/38/5361452.png",
            description: "Shia LaBeouf poursuivi pour violences conjugales par son ex-compagne FKA Twigs"
        },
        {
            img: "https://fr.web.img6.acsta.net/r_640_360/newsv7/20/12/14/11/56/5307425.jpg",
            description: "Toy Story : Chris Evans en Buzz l'éclair, l'acteur réagit"
        },
    ]

    return (
        <div style={{ margin: '30px'}}>
            <Row>
                <Col md={8}>
                    <Carousel>
                        {
                            items.map( (item, i) => <Item key={i} item={item} /> )
                        }
                    </Carousel>
                </Col>
                <Col md={4}>
                    <h2 className="text-center font-weight-bold">Prochainement</h2>
                    <List>
                        {
                            newsList.map( (news, i) =>
                                <ListItem key={i} style={{ fontWeight: 'bold', borderBottom: '1px solid grey'}}>{news.description}</ListItem>
                            )
                        }
                    </List>
                </Col>
            </Row>
            <h2 style={{marginBottom: '-10px', marginTop: '20px'}} className="font-weight-bold">Dernière news cinéma</h2><br/>
            <Row>
                    {
                        newsList2.map( (news, i) =>
                            <Paper key={i} style={{ maxWidth: 400, height: 'auto', margin: '25px 25px 0 0'}}>
                                <img src={news.img} style={{ maxWidth: 400, height: 'auto'}}/>
                                <p>{news.description}</p>
                            </Paper>
                        )
                    }
            </Row>
        </div>
    );
}