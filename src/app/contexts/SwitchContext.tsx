import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface SwitchContextProps {
  switchStates: { [key: string]: boolean };
  updateSwitchState: (id: string, value: boolean) => void;
}

// Inicializando o contexto com um valor indefinido
export const SwitchContext = createContext<SwitchContextProps | undefined>(undefined);

export const SwitchProvider = ({ children }: { children: ReactNode }) => {
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadSwitchStates = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/getAllSwitchStates');
        const data = await response.json();
        setSwitchStates(data);
      } catch (error) {
        console.error('Failed to load switch states:', error);
      }
    };

    loadSwitchStates();
  }, []);

  const updateSwitchState = async (id: string, value: boolean) => {
    const previousState = switchStates[id];
    setSwitchStates(prevStates => ({ ...prevStates, [id]: value }));

    try {
      const response = await fetch('YOUR_API_ENDPOINT/updateSwitchState', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, switchValue: value }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming the response contains the updated state or a confirmation
      const data = await response.json();
      setSwitchStates(prevStates => ({ ...prevStates, [id]: data.switchValue }));
    } catch (error) {
      console.error('Failed to update switch state:', error);
      setSwitchStates(prevStates => ({ ...prevStates, [id]: previousState }));
    }
  };

  return (
    <SwitchContext.Provider value={{ switchStates, updateSwitchState }}>
      {children}
    </SwitchContext.Provider>
  );
};
