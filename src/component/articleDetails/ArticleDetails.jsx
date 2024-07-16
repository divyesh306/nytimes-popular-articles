import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
const DefaultImg = require('../../assets/default-image-icon-missing-picture.jpg');

export default function ArticleDetails({ article, onBacktoList}) {

  return (
    <div className='grid h-screen place-items-center p-4'>
    <Card className="w-auto max-w-[50rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
          <img
            className='w-full'
            src={article?.media[0]?.['media-metadata'][2].url || DefaultImg}
            alt={article.title}
          />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {article.title}
          </Typography>
        </div>
        <Typography color="gray">
          {article.abstract}
        </Typography>
        <div className="flex items-center justify-between my-2">
          <Typography className="font-normal">{new Date(article.updated).toDateString()}</Typography>
          <Typography className="font-normal">{article.byline}</Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true} onClick={() => onBacktoList(null)}>
          Back to List
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}

