import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img3.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title 4',
          body: 'body 4',
          url: 'img4.jpg',
        },
        {
          userId: 5,
          id: 5,
          title: 'title 5',
          body: 'body 5',
          url: 'img5.jpg',
        },
        {
          userId: 6,
          id: 6,
          title: 'title 6',
          body: 'body 6',
          url: 'img6.jpg',
        },
        {
          userId: 7,
          id: 7,
          title: 'title 7',
          body: 'body 7',
          url: 'img7.jpg',
        },
        {
          userId: 8,
          id: 8,
          title: 'title 8',
          body: 'body 8',
          url: 'img8.jpg',
        },
        {
          userId: 9,
          id: 9,
          title: 'title 9',
          body: 'body 9',
          url: 'img9.jpg',
        },
        {
          userId: 10,
          id: 10,
          title: 'title 10',
          body: 'body 10',
          url: 'img10.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(9);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(13);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3 3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 10 10' })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 2 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3 3' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search value: title 1' })).toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title 1 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3 3' })).toBeInTheDocument();

    userEvent.type(search, 'post does not exist');
    expect(screen.queryByRole('heading', { name: 'title 1' })).not.toBeInTheDocument();
    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
  });

  it('should load more posts when click in the button', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(2);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);

    expect(screen.getByRole('heading', { name: 'title 10 10' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
