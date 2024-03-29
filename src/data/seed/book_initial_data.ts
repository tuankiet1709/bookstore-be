import { ICategory } from '../../components/category';

export async function SeedData(category: ICategory[]) {
  return [
    {
      title: 'Aussie Rules',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81c2gPHp50L.jpg',
      quantity: 50,
      price: 190000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Jill Shalvis',
      category: category[0]._id,
      isDelete: false,
    },
    {
      title: 'Remarkably Bright Creatures',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81X7rAcaQkL.jpg',
      quantity: 20,
      price: 650000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Shelby Van Pelt',
      category: category[0]._id,
      isDelete: false,
    },
    {
      title: '9 Yellow Moon Road',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51N6KlfsnIL._SX328_BO1,204,203,200_.jpg',
      quantity: 30,
      price: 150000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Fern Michaels',
      category: category[0]._id,
      isDelete: false,
    },
    {
      title: 'Summer Island: A Novel',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81nbsR4U9fL.jpg',
      quantity: 60,
      price: 225000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Kristin Hannah',
      category: category[0]._id,
      isDelete: false,
    },
    {
      title: 'One True Loves: A Novel',
      image:
        'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4767/9781476776903.jpg',
      quantity: 100,
      price: 350000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Taylor Jenkins Reid',
      category: category[0]._id,
      isDelete: false,
    },
    {
      title: 'The Art Of War',
      image: 'https://images-na.ssl-images-amazon.com/images/I/91jwTL9mXHL.jpg',
      quantity: 100,
      price: 169000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Sun Tzu',
      category: category[0]._id,

      isDelete: false,
    },
    {
      title: 'Santa Cruise',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81-Yx8WX+xL.jpg',
      quantity: 0,
      price: 289000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Fern Michaels',
      category: category[0]._id,

      isDelete: false,
    },
    {
      title: 'A Raisin in the Sun',
      image:
        'http://www.alaskapublic.org/wp-content/uploads/2012/04/20120413-Raisin-in-Sun-Stage-Talk_PT.png',
      quantity: 100,
      price: 370000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Lorraine Hansberry',
      category: category[0]._id,

      isDelete: false,
    },
    {
      title: 'Before We Grow Old',
      image: 'https://m.media-amazon.com/images/I/416yTybjtPL.jpg',
      quantity: 100,
      price: 405000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Clare Swatman',
      category: category[0]._id,

      isDelete: false,
    },
    {
      title: 'Harry Potter: the Cursed Child',
      image: 'https://m.media-amazon.com/images/I/51G+WN7UghL.jpg',
      quantity: 100,
      price: 250000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'J. K. Rowling',
      category: category[0]._id,

      isDelete: false,
    },
    {
      title: 'Born a Crime',
      image: 'https://m.media-amazon.com/images/I/5102ogTDCGL.jpg',
      quantity: 50,
      price: 310000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Trevor Noah',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: `I'll Show Myself Out`,
      image: 'https://images-na.ssl-images-amazon.com/images/I/714vv1T7weL.jpg',
      quantity: 20,
      price: 440000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Jessi Klein',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: 'Bossypants',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81wOflATS3L.jpg',
      quantity: 60,
      price: 262000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Tina Fey',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: 'Hello, Molly!: A Memoir',
      image: 'https://images-na.ssl-images-amazon.com/images/I/7146MOOZkYL.jpg',
      quantity: 100,
      price: 445000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Molly Shannon',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: 'Born Standing Up',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51W4esQ-TEL._SX450_BO1,204,203,200_.jpg',
      quantity: 100,
      price: 320000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Steve Martin',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: `Will They, Won't They?`,
      image:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1627914280l/58039635.jpg',
      quantity: 100,
      price: 405000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Fern Michaels',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: 'Is This Anything?',
      image: 'https://images-na.ssl-images-amazon.com/images/I/71-vq485c0L.jpg',
      quantity: 100,
      price: 300000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Jerry Seinfeld',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: 'Playing with Myself',
      image: 'https://images-na.ssl-images-amazon.com/images/I/819w+WoSmiL.jpg',
      quantity: 100,
      price: 570000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Randy Rainbow',
      category: category[1]._id,

      isDelete: false,
    },
    {
      title: 'So Help Me Golf',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81h9eHEoF1L.jpg',
      quantity: 50,
      price: 550000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Rick Reilly',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: `Desktop Boxing`,
      image: 'https://images-na.ssl-images-amazon.com/images/I/81-iWF7y+YL.jpg',
      quantity: 20,
      price: 230000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Running Press',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: 'New York Yankees Trivia Book',
      image: 'https://m.media-amazon.com/images/I/51tP9k85zfL.jpg',
      quantity: 30,
      price: 235000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Ray Walker',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: 'Determined Look',
      image: 'https://images-na.ssl-images-amazon.com/images/I/71qhpiCIHNL.jpg',
      quantity: 60,
      price: 130000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Three Year Letterman',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: 'A Dad Joke A Day',
      image: 'https://images-na.ssl-images-amazon.com/images/I/711e2XHIsML.jpg',
      quantity: 100,
      price: 200000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'DaddiLife Books',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: 'Pittsburgh Steeler Trivia Book',
      image: 'https://images-na.ssl-images-amazon.com/images/I/612ksFOz0MS.jpg',
      quantity: 100,
      price: 250000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Ray Walker',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: `St. Louis Cardinals Trivia Boo`,
      image: 'https://m.media-amazon.com/images/I/41FZL006otL.jpg',
      quantity: 100,
      price: 234000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Ray Walker',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: 'Finger Weightlifting',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/41F3Gs4TaBL._SY382_BO1,204,203,200_.jpg',
      quantity: 100,
      price: 95000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Running Press',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: `I Never Metaphor I Didn't Like`,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/41VERsHHLRL._SX342_SY445_QL70_ML2_.jpg',
      quantity: 100,
      price: 382000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Dr. Mardy Grothe',
      category: category[2]._id,

      isDelete: false,
    },
    {
      title: `Desktop Tetherball`,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/31+HcEDV63L._SY483_BO1,204,203,200_.jpg',
      quantity: 100,
      price: 200000,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      author: 'Alan Goldsher',
      category: category[2]._id,
      isDelete: false,
    },
  ];
}
