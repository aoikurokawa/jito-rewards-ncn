/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  isProgramError,
  type Address,
  type SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM,
  type SolanaError,
} from '@solana/web3.js';
import { JITO_WEIGHT_TABLE_PROGRAM_ADDRESS } from '../programs';

/** NoMoreTableSlots: No more table slots available */
export const JITO_WEIGHT_TABLE_ERROR__NO_MORE_TABLE_SLOTS = 0x2000; // 8192
/** DenominatorIsZero: Zero in the denominator */
export const JITO_WEIGHT_TABLE_ERROR__DENOMINATOR_IS_ZERO = 0x2100; // 8448
/** ArithmeticOverflow: Overflow */
export const JITO_WEIGHT_TABLE_ERROR__ARITHMETIC_OVERFLOW = 0x2101; // 8449
/** ModuloOverflow: Modulo Overflow */
export const JITO_WEIGHT_TABLE_ERROR__MODULO_OVERFLOW = 0x2102; // 8450
/** IncorrectWeightTableAdmin: Incorrect weight table admin */
export const JITO_WEIGHT_TABLE_ERROR__INCORRECT_WEIGHT_TABLE_ADMIN = 0x2200; // 8704
/** CannotCreateFutureWeightTables: Cannnot create future weight tables */
export const JITO_WEIGHT_TABLE_ERROR__CANNOT_CREATE_FUTURE_WEIGHT_TABLES = 0x2201; // 8705

export type JitoWeightTableError =
  | typeof JITO_WEIGHT_TABLE_ERROR__ARITHMETIC_OVERFLOW
  | typeof JITO_WEIGHT_TABLE_ERROR__CANNOT_CREATE_FUTURE_WEIGHT_TABLES
  | typeof JITO_WEIGHT_TABLE_ERROR__DENOMINATOR_IS_ZERO
  | typeof JITO_WEIGHT_TABLE_ERROR__INCORRECT_WEIGHT_TABLE_ADMIN
  | typeof JITO_WEIGHT_TABLE_ERROR__MODULO_OVERFLOW
  | typeof JITO_WEIGHT_TABLE_ERROR__NO_MORE_TABLE_SLOTS;

let jitoWeightTableErrorMessages:
  | Record<JitoWeightTableError, string>
  | undefined;
if (process.env.NODE_ENV !== 'production') {
  jitoWeightTableErrorMessages = {
    [JITO_WEIGHT_TABLE_ERROR__ARITHMETIC_OVERFLOW]: `Overflow`,
    [JITO_WEIGHT_TABLE_ERROR__CANNOT_CREATE_FUTURE_WEIGHT_TABLES]: `Cannnot create future weight tables`,
    [JITO_WEIGHT_TABLE_ERROR__DENOMINATOR_IS_ZERO]: `Zero in the denominator`,
    [JITO_WEIGHT_TABLE_ERROR__INCORRECT_WEIGHT_TABLE_ADMIN]: `Incorrect weight table admin`,
    [JITO_WEIGHT_TABLE_ERROR__MODULO_OVERFLOW]: `Modulo Overflow`,
    [JITO_WEIGHT_TABLE_ERROR__NO_MORE_TABLE_SLOTS]: `No more table slots available`,
  };
}

export function getJitoWeightTableErrorMessage(
  code: JitoWeightTableError
): string {
  if (process.env.NODE_ENV !== 'production') {
    return (
      jitoWeightTableErrorMessages as Record<JitoWeightTableError, string>
    )[code];
  }

  return 'Error message not available in production bundles.';
}

export function isJitoWeightTableError<
  TProgramErrorCode extends JitoWeightTableError,
>(
  error: unknown,
  transactionMessage: {
    instructions: Record<number, { programAddress: Address }>;
  },
  code?: TProgramErrorCode
): error is SolanaError<typeof SOLANA_ERROR__INSTRUCTION_ERROR__CUSTOM> &
  Readonly<{ context: Readonly<{ code: TProgramErrorCode }> }> {
  return isProgramError<TProgramErrorCode>(
    error,
    transactionMessage,
    JITO_WEIGHT_TABLE_PROGRAM_ADDRESS,
    code
  );
}
