import React, { ReactNode, FC } from "react";
import "./main-layout.scss";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes";

interface Props {
    children?: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <div className='container'>
            {pathname === ROUTES.SIGN_IN ?
                <div className="preview-wrapper">
                    <h2 className='preview-hello'>
                        hello, evil <span className="evil">martians</span>
                    </h2>
                    <h2 className='preview-description'>
                        Dear friends, I am sad to inform you that our world has been invaded by !
                        But do not despair, there is hope for salvation.
                        In order to survive, you must urgently register on our site and read an important letter in the mail.
                        In this letter you will find information on how to save our world.
                        In addition, we also encourage you to read the resume of a candidate who can help you survive this crisis.
                        Don't lose hope, friends, together we can stand up to the <span className="evil">Martians</span> and save our world!
                    </h2>
                </div> : null
            }
            <main>{children}</main>
        </div>
    );
}

export default MainLayout;