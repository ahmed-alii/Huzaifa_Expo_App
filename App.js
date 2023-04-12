import React from 'react';
import { UserProvider } from './context/usercontext';
import ApplicationEntry from './applicationEntry';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {IconRegistry} from "@ui-kitten/components";

export default function App() {
    return (
        <UserProvider>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationEntry />
        </UserProvider>
    );
}
