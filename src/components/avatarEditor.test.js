import React, { useState } from 'react';
import { create, act } from 'react-test-renderer';
import AvatarEditor from './avatarEditor';

import * as ImagePicker from 'expo-image-picker';

const mockSetState = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn()
}));

describe('<avataEditor />', () => {
    beforeEach(() => {
        useState.mockImplementation(initial => [initial, mockSetState]);
    });
    afterEach(() => {
        useState.mockClear();
    });

    it('<avataEditor /> should render', () => {
        const tree = create(<AvatarEditor />).toJSON();
        expect(tree.children.length).toBe(1);
    });

    it('Existing avatar should be displayed', () => {
        const tree = create(<AvatarEditor avatarImage="/path/to/image" />);

        expect(tree.root.findByProps({'testId': 'avatarPicker'}).children.length).toBe(1);
        try {
            tree.root.findByProps({'testId': 'imgPicker'});
        } catch(e) {
            expect(e).toEqual(Error('No instances found with props: {"testId":"imgPicker"}'));
        }
    });

    it('If no existing avatar, Icon should be displayed', () => {
        const tree = create(<AvatarEditor />);

        expect(tree.root.findByProps({'testId': 'imgPicker'}).children.length).toBe(1);
        try {
            tree.root.findByProps({'testId': 'avatarPicker'});
        } catch(e) {
            expect(e).toEqual(Error('No instances found with props: {"testId":"avatarPicker"}'));
        }
    });

    it('Test whether image is not added to the state when Image picker gets cancelled', () => {
        const mockAddImage = jest.fn();
        jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockImplementation(() => Promise.resolve({cancelled: true, uri: 'path/to/image'}));
        const tree = create(<AvatarEditor avatarImage="/path/to/image" addImage={mockAddImage}/>);
        act(() => {
            tree.root.findByProps({'testId': 'avatarPicker'}).props.onPress();
        });

        expect(mockSetState).not.toHaveBeenCalled();
        expect(mockAddImage).not.toHaveBeenCalled();
    });

    it('Test whether image is added to the state when Image picker status is not cancelled', () => {
        const mockAddImage = jest.fn();
        jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockImplementation(() => Promise.resolve({cancelled: false, uri: 'path/to/image'}));
        const tree = create(<AvatarEditor avatarImage="/path/to/image" addImage={mockAddImage}/>);
        act(() => {
            tree.root.findByProps({'testId': 'avatarPicker'}).props.onPress();
        });

        return ImagePicker.launchImageLibraryAsync().then(() => {
            expect(mockSetState).toHaveBeenCalledWith('path/to/image');
            expect(mockAddImage).toHaveBeenCalledWith('path/to/image');
        })
    });

    it('Test useEffect when media library permissions are not granted', () => {
        const mockAddImage = jest.fn();
        jest.spyOn(ImagePicker, 'requestMediaLibraryPermissionsAsync').mockImplementation(() => Promise.resolve({status: 'error'}));
        const tree = create(<AvatarEditor avatarImage="/path/to/image" addImage={mockAddImage}/>);
        return ImagePicker.requestMediaLibraryPermissionsAsync().then((res) => {
            expect(res.status).toEqual('error');
        })
    });
});