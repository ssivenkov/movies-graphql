import { Movie } from 'apollo/generated/schema';

export type ListItemCardPropsType = {
  poster: Movie['poster'];
  title: Movie['title'];

  linkTo?: string;
};
