"use client"

import { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchFeatureFlag, toggleFeatureFlag } from '../services/featureFlags';

interface FeatureFlagContextProps {
    flags: Record<string, boolean>;
    updateFlag: (name: string, value: boolean) => Promise<void>;
    isLoading: boolean;
}

export const FeatureFlagContext = createContext<FeatureFlagContextProps>({
    flags: {},
    updateFlag: async () => {},
    isLoading: false,
});

export const FeatureFlagProvider = ({ children }: { children: ReactNode }) => {
    const [flags, setFlags] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const loadFlags = async () => {
            setIsLoading(true);
            try {
                const flagNames = ['dark_mode', 'beta_ui', 'new_search_algorithm'];
                const loadedFlags: Record<string, boolean> = {};
                
                for (const name of flagNames) {
                    const flag = await fetchFeatureFlag(name);
                    loadedFlags[name] = flag.isEnabled;
                }
                
                setFlags(loadedFlags);
            } catch (error) {
                console.error("Failed to load feature flags:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        loadFlags();
    }, []);

    const updateFlag = async (name: string, value: boolean) => {
        setIsLoading(true);
        try {
            const updatedFlag = await toggleFeatureFlag(name, value);
            setFlags((prevFlags) => ({ ...prevFlags, [name]: updatedFlag.isEnabled }));
            
            if (name === 'dark_mode') {
                applyDarkMode(updatedFlag.isEnabled);
            }
        } catch (error) {
            console.error(`Failed to update flag ${name}:`, error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const applyDarkMode = (enabled: boolean) => {
        if (enabled) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    
    useEffect(() => {
        if (flags['dark_mode']) {
            applyDarkMode(true);
        }
    }, [flags]);

    return (
        <FeatureFlagContext.Provider value={{ flags, updateFlag, isLoading }}>
            {children}
        </FeatureFlagContext.Provider>
    );
};
