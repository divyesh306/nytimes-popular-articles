import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button
} from "@material-tailwind/react";

const DefaultImg = require('../../assets/default-image-icon-missing-picture.jpg');

export default function NewsCard({ article, onArticleClick }) {
    return (
        <Card className="rounded overflow-hidden shadow-lg max-w-[24rem] m-2" key={article.id}>
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none h-[201px]"
            >
                <img
                    src={article.media[0]?.['media-metadata'][2].url || DefaultImg}
                    alt={article.title} 
                />
            </CardHeader>
            <CardBody className='h-[18rem]'>
                <h2 className="text-xl font-semibold mb-2" onClick={() => onArticleClick(article)}>{article.title}</h2>
                <p className="text-gray-700 text-base">
                    {article.abstract}
                </p>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
                <Button onClick={() => onArticleClick(article)}>
                    Read More
                </Button>
            </CardFooter>
        </Card>
    );
}
