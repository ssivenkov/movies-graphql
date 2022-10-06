import React from 'react';

import { PosterSize, useMovieQuery } from 'apollo/generated/schema';
import { Divider } from 'common/components/divider/divider';
import { EmptyImage } from 'common/components/images/emptyImage/emptyImage';
import { Image } from 'common/components/images/image/image';
import { Loader } from 'common/components/loader/Loader';
import { LoaderContainer } from 'common/components/loader/LoaderContainer';
import {
  Container,
  ContainerSpaceBetween,
  PageContainer,
  RowContainer,
} from 'common/components/pageContainer/pageContainer';
import { PageTitle } from 'common/components/pageTitle/pageTitle';
import { NOTIFICATION_TIMEOUT } from 'common/constants/constants';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Caption, Link, Overview, Text } from './styles';

export const MoviePage = () => {
  const { movieID } = useParams<string>();

  const { loading, error, data } = useMovieQuery({
    variables: {
      id: movieID ?? '',
      size: PosterSize.Original,
    },
  });

  const imageSize = 350;
  const imageBorderRadius = 10;

  if (error) {
    return (
      <PageContainer>
        <ToastContainer autoClose={NOTIFICATION_TIMEOUT} />
        <div>{error.message}</div>
      </PageContainer>
    );
  }

  if (loading) {
    return (
      <PageContainer>
        <ToastContainer autoClose={NOTIFICATION_TIMEOUT} />
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ToastContainer autoClose={NOTIFICATION_TIMEOUT} />
      <RowContainer>
        <Container margin='0 40px 0 0'>
          {data?.movies?.movie?.poster ? (
            <Image
              alt={data?.movies?.movie?.title ?? 'empty image'}
              borderRadius={imageBorderRadius}
              height={imageSize}
              src={data?.movies?.movie?.poster}
              width={imageSize}
            />
          ) : (
            <EmptyImage
              borderRadius={imageBorderRadius}
              height={imageSize}
              width={imageSize}
            />
          )}
        </Container>
        <Container>
          {data?.movies?.movie?.title && (
            <PageTitle>{data?.movies?.movie?.title}</PageTitle>
          )}
          {data?.movies?.movie?.overview && (
            <Overview>{data?.movies?.movie?.overview}</Overview>
          )}
          {data?.movies?.movie?.releaseDate && (
            <>
              <Divider />
              <ContainerSpaceBetween>
                <Caption>Release date</Caption>
                <Text>{new Date(data?.movies?.movie?.releaseDate).toLocaleString()}</Text>
              </ContainerSpaceBetween>
            </>
          )}
          {!!data?.movies?.movie?.budget && (
            <>
              <Divider />
              <ContainerSpaceBetween>
                <Caption>Budget</Caption>
                <Text>{`$${data?.movies?.movie?.budget.toLocaleString()}`}</Text>
              </ContainerSpaceBetween>
            </>
          )}
          {data?.movies?.movie?.homepage && (
            <>
              <Divider />
              <ContainerSpaceBetween>
                <Caption>Homepage</Caption>
                <Link
                  href={data?.movies?.movie?.homepage}
                  rel='noreferrer'
                  target='_blank'
                >
                  Homepage link
                </Link>
              </ContainerSpaceBetween>
            </>
          )}
          {data?.movies?.movie?.videos[0].links?.web && (
            <>
              <Divider />
              <ContainerSpaceBetween>
                <Caption>Video</Caption>
                <Link
                  href={data?.movies?.movie?.videos[0].links?.web}
                  rel='noreferrer'
                  target='_blank'
                >
                  Video link
                </Link>
              </ContainerSpaceBetween>
            </>
          )}
        </Container>
      </RowContainer>
    </PageContainer>
  );
};
