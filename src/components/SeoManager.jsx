import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useOutcome } from '../context/OutcomeContext';

const SeoManager = () => {
    const { currentView } = useOutcome();

    const getMeta = () => {
        switch (currentView) {
            case 'landing':
                return {
                    title: "TheSocialProphet | Wizarding World Network",
                    description: "Connect with witches and wizards in a reimagined 2004-era social network. Board the Hogwarts Express today.",
                };
            case 'profile':
                return {
                    title: "Garv Jain | Chief Magical Architect",
                    description: "Portfolio of Garv Jain - React Enchanter & Full-Stack Alchemist.",
                };
            case 'projects':
                return {
                    title: "Magical Projects | Garv Jain",
                    description: "Explore the Department of Magical Projects. From Wizard's Chess to recruitment spells.",
                };
            case 'resume':
                return {
                    title: "Curriculum Vitae | Garv Jain",
                    description: "Professional history and magical qualifications of Garv Jain.",
                };
            default:
                return {
                    title: "TheSocialProphet",
                    description: "A magical social network experience.",
                };
        }
    };

    const meta = getMeta();

    return (
        <Helmet>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:type" content="website" />
            <meta name="theme-color" content="#3b5998" />
        </Helmet>
    );
};

export default SeoManager;
