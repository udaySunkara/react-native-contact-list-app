import * as React from 'react';
import { navigationRef, navigate } from './rootNavigation';
import { create, act } from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';




describe('Test Root navigation util', () => {

    it('Test navigationRef', () => {
        act(() => {
            const tree = create(<NavigationContainer ref={navigationRef}></NavigationContainer>);
        })
        expect(navigationRef).toBeDefined();
    });

    it('Test navigate', () => {
        const mockNavigate = jest.spyOn(navigationRef.current, 'navigate').mockImplementation(() => {});
        act(() => {
            const tree = create(<NavigationContainer ref={navigationRef}>
            </NavigationContainer>);
        });
        navigationRef.current = {navigate: () => {}};
        navigate('manage', null);
        expect(mockNavigate).not.toHaveBeenCalledWith('manage', null);
    });
});