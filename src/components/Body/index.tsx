import { useEffect, useRef, useState } from 'react';
import './style.css'

import { Modal } from '../RightModal'
import List from '../List';

interface Props {
    searchStr: string
};

export function Body(props: Props) {
    return (
        <main>
            <div className="bodyHeader">
                <div>Resultado de busca</div>
                <Modal />
            </div>
            <List/>

        </main>
    );

}


