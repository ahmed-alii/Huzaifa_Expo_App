import React from 'react';
import { UserProvider } from './context/usercontext';
import ApplicationEntry from './applicationEntry';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {IconRegistry} from "@ui-kitten/components";
import { LogBox } from 'react-native';

export default function App() {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications


    return (
        <UserProvider>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationEntry />
        </UserProvider>
    );
}
