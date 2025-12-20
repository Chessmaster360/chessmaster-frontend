import { useCallback } from 'react';
import { Chess } from 'chess.js';
import { useGameStore } from '../store/useGameStore';

export interface ParsedGame {
    pgn: string;
    white: string;
    black: string;
    whiteElo: number;
    blackElo: number;
    result: string;
    event: string;
    date: string;
    moveCount: number;
}

/**
 * Hook for parsing PGN strings and loading them into the game store
 */
export const usePgnParser = () => {
    const loadPGN = useGameStore((state) => state.loadPGN);
    const reset = useGameStore((state) => state.reset);

    /**
     * Parse a PGN string and return game metadata without loading it
     */
    const parsePGN = useCallback((pgn: string): ParsedGame | null => {
        try {
            const chess = new Chess();
            chess.loadPgn(pgn);
            const header = chess.header();
            const history = chess.history();

            return {
                pgn,
                white: header['White'] || 'Unknown',
                black: header['Black'] || 'Unknown',
                whiteElo: parseInt(header['WhiteElo'] || '0'),
                blackElo: parseInt(header['BlackElo'] || '0'),
                result: header['Result'] || '*',
                event: header['Event'] || '',
                date: header['Date'] || '',
                moveCount: Math.ceil(history.length / 2),
            };
        } catch (e) {
            console.error('Failed to parse PGN:', e);
            return null;
        }
    }, []);

    /**
     * Load a PGN into the game store
     */
    const loadGame = useCallback((pgn: string): boolean => {
        return loadPGN(pgn);
    }, [loadPGN]);

    /**
     * Parse multiple PGN games from a single string
     * (Chess.com exports often have multiple games)
     */
    const parseMultiplePGN = useCallback((pgnString: string): ParsedGame[] => {
        const games: ParsedGame[] = [];

        // Split by double newline followed by [Event
        const pgnParts = pgnString.split(/\n\n(?=\[Event)/);

        for (const part of pgnParts) {
            const trimmed = part.trim();
            if (trimmed) {
                const parsed = parsePGN(trimmed);
                if (parsed) {
                    games.push(parsed);
                }
            }
        }

        return games;
    }, [parsePGN]);

    /**
     * Validate if a string is a valid PGN
     */
    const validatePGN = useCallback((pgn: string): boolean => {
        try {
            const chess = new Chess();
            chess.loadPgn(pgn);
            return chess.history().length > 0;
        } catch {
            return false;
        }
    }, []);

    return {
        parsePGN,
        parseMultiplePGN,
        loadGame,
        validatePGN,
        resetGame: reset,
    };
};
