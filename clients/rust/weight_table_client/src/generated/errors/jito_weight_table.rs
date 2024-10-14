//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! <https://github.com/kinobi-so/kinobi>
//!

use num_derive::FromPrimitive;
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum JitoWeightTableError {
    /// 8192 - No more table slots available
    #[error("No more table slots available")]
    NoMoreTableSlots = 0x2000,
    /// 8448 - Zero in the denominator
    #[error("Zero in the denominator")]
    DenominatorIsZero = 0x2100,
    /// 8449 - Overflow
    #[error("Overflow")]
    ArithmeticOverflow = 0x2101,
    /// 8450 - Modulo Overflow
    #[error("Modulo Overflow")]
    ModuloOverflow = 0x2102,
    /// 8704 - Incorrect weight table admin
    #[error("Incorrect weight table admin")]
    IncorrectWeightTableAdmin = 0x2200,
    /// 8705 - Cannnot create future weight tables
    #[error("Cannnot create future weight tables")]
    CannotCreateFutureWeightTables = 0x2201,
}

impl solana_program::program_error::PrintProgramError for JitoWeightTableError {
    fn print<E>(&self) {
        solana_program::msg!(&self.to_string());
    }
}

