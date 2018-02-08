import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { PlayNine } from './components/PlayNine/PlayNine';
import { AuthorQuiz } from './components/AuthorQuiz/AuthorQuiz';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/playnine' component={ PlayNine } />
    <Route path='/authorquiz' component={ AuthorQuiz } />
    <Route path='/fetchdata' component={ FetchData } />
</Layout>;
