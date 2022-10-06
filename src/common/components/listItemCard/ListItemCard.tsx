import { forwardRef, Ref } from 'react';

import { EmptyImage } from 'common/components/images/emptyImage/emptyImage';

import { Container, Image, StyledLink, Title } from './styles';
import { ListItemCardPropsType } from './types';

const ListItemCard = forwardRef(
  (props: ListItemCardPropsType, ref: Ref<HTMLDivElement>) => {
    const { title, poster, linkTo } = props;

    return (
      <Container ref={ref}>
        {title && poster ? (
          <Image alt={title} src={poster} />
        ) : (
          <EmptyImage height={200} width={200} />
        )}
        <Title>{title}</Title>
        {linkTo && <StyledLink to={linkTo}>View</StyledLink>}
      </Container>
    );
  },
);

ListItemCard.displayName = 'ListItemCard';

export default ListItemCard;
