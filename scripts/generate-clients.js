const kinobi = require("kinobi");
const anchorIdl = require("@kinobi-so/nodes-from-anchor");
const path = require("path");
const renderers = require('@kinobi-so/renderers');

// Paths.
const projectRoot = path.join(__dirname, "..");

const idlDir = path.join(projectRoot, "idl");

const rustClientsDir = path.join(__dirname, "..", "clients", "rust");
const jsClientsDir = path.join(__dirname, "..", "clients", "js");

// Generate the weight table client in Rust and JavaScript.
const rustWeightTableClientDir = path.join(rustClientsDir, "weight_table_client");
const jsWeightTableClientDir = path.join(jsClientsDir, "weight_table_client");
const weightTableRootNode = anchorIdl.rootNodeFromAnchor(require(path.join(idlDir, "jito_weight_table.json")));
const weightTableKinobi = kinobi.createFromRoot(weightTableRootNode);
weightTableKinobi.update(kinobi.bottomUpTransformerVisitor([
    {
        // PodU64 -> u64
        select: (node) => {
            return (
                kinobi.isNode(node, "structFieldTypeNode") &&
                node.type.name === "podU64"
            );
        },
        transform: (node) => {
            kinobi.assertIsNode(node, "structFieldTypeNode");
            return {
                ...node,
                type: kinobi.numberTypeNode("u64"),
            };
        },
    },
    {
        // PodU32 -> u32
        select: (node) => {
            return (
                kinobi.isNode(node, "structFieldTypeNode") &&
                node.type.name === "podU32"
            );
        },
        transform: (node) => {
            kinobi.assertIsNode(node, "structFieldTypeNode");
            return {
                ...node,
                type: kinobi.numberTypeNode("u32"),
            };
        },
    },
    {
        // PodU16 -> u16
        select: (node) => {
            return (
                kinobi.isNode(node, "structFieldTypeNode") &&
                node.type.name === "podU16"
            );
        },
        transform: (node) => {
            kinobi.assertIsNode(node, "structFieldTypeNode");
            return {
                ...node,
                type: kinobi.numberTypeNode("u16"),
            };
        },
    },
    // add 8 byte discriminator to accountNode
    {
        select: (node) => {
            return (
                kinobi.isNode(node, "accountNode")
            );
        },
        transform: (node) => {
            kinobi.assertIsNode(node, "accountNode");

            return {
                ...node,
                data: {
                    ...node.data,
                    fields: [
                        kinobi.structFieldTypeNode({ name: 'discriminator', type: kinobi.numberTypeNode('u64') }),
                        ...node.data.fields
                    ]
                }
            };
        },
    },
]));
weightTableKinobi.accept(renderers.renderRustVisitor(path.join(rustWeightTableClientDir, "src", "generated"), {
    formatCode: true,
    crateFolder: rustWeightTableClientDir,
    deleteFolderBeforeRendering: true,
    toolchain: "+nightly-2024-07-25"
}));
weightTableKinobi.accept(renderers.renderJavaScriptVisitor(path.join(jsWeightTableClientDir), {}));

// // Generate the vault client in Rust and JavaScript.
// const rustVaultClientDir = path.join(rustClientsDir, "vault_client");
// const jsVaultClientDir = path.join(jsClientsDir, "vault_client");
// const vaultRootNode = anchorIdl.rootNodeFromAnchor(require(path.join(idlDir, "jito_vault.json")));
// const vaultKinobi = kinobi.createFromRoot(vaultRootNode);
// vaultKinobi.update(kinobi.bottomUpTransformerVisitor([
//     {
//         // PodU64 -> u64
//         select: (node) => {
//             return (
//                 kinobi.isNode(node, "structFieldTypeNode") &&
//                 node.type.name === "podU64"
//             );
//         },
//         transform: (node) => {
//             kinobi.assertIsNode(node, "structFieldTypeNode");
//             return {
//                 ...node,
//                 type: kinobi.numberTypeNode("u64"),
//             };
//         },
//     },
//     {
//         // PodU32 -> u32
//         select: (node) => {
//             return (
//                 kinobi.isNode(node, "structFieldTypeNode") &&
//                 node.type.name === "podU32"
//             );
//         },
//         transform: (node) => {
//             kinobi.assertIsNode(node, "structFieldTypeNode");
//             return {
//                 ...node,
//                 type: kinobi.numberTypeNode("u32"),
//             };
//         },
//     },
//     {
//         // PodU16 -> u16
//         select: (node) => {
//             return (
//                 kinobi.isNode(node, "structFieldTypeNode") &&
//                 node.type.name === "podU16"
//             );
//         },
//         transform: (node) => {
//             kinobi.assertIsNode(node, "structFieldTypeNode");
//             return {
//                 ...node,
//                 type: kinobi.numberTypeNode("u16"),
//             };
//         },
//     },
//     {
//         select: (node) => {
//             return (
//                 kinobi.isNode(node, "accountNode")
//             );
//         },
//         transform: (node) => {
//             kinobi.assertIsNode(node, "accountNode");

//             return {
//                 ...node,
//                 data: {
//                     ...node.data,
//                     fields: [
//                         kinobi.structFieldTypeNode({ name: 'discriminator', type: kinobi.numberTypeNode('u64') }),
//                         ...node.data.fields
//                     ]
//                 }
//             };
//         },
//     },
// ]));
// vaultKinobi.accept(renderers.renderRustVisitor(path.join(rustVaultClientDir, "src", "generated"), {
//     formatCode: true,
//     crateFolder: rustVaultClientDir,
//     deleteFolderBeforeRendering: true,
//     toolchain: "+nightly-2024-07-25"
// }));
// vaultKinobi.accept(renderers.renderJavaScriptVisitor(path.join(jsVaultClientDir), {}));