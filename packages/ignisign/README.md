# @corsair-dev/ignisign

Ignisign plugin for Corsair.

## Install

```bash
pnpm add @corsair-dev/ignisign
```

## Endpoints

| Operation | Operation ID | Risk | Description |
|-----------|--------------|------|-------------|
| `applications.getContext` | `ignisign.api.applications.getContext` | `read` | Get application configuration, environments, and settings context |
| `bareSignatures.getConfiguration` | `ignisign.api.bareSignatures.getConfiguration` | `read` | Get bare signature application configuration and authorized origins |
| `bareSignatures.getProofs` | `ignisign.api.bareSignatures.getProofs` | `read` | Fetch cryptographic proofs and signer claims using proof access token |
| `bareSignatures.getProofToken` | `ignisign.api.bareSignatures.getProofToken` | `read` | Exchange authorization code for proof access token in bare signature flow |
| `documents.checkAuthenticity` | `ignisign.api.documents.checkAuthenticity` | `read` | Verify document authenticity and hash integrity |
| `documents.downloadOriginalDoc` | `ignisign.api.documents.downloadOriginalDoc` | `read` | Download original document file as binary data |
| `documents.get` | `ignisign.api.documents.get` | `read` | Get document record and metadata by ID |
| `documents.getContext` | `ignisign.api.documents.getContext` | `read` | Get document context including signature summaries and statements |
| `documents.initialize` | `ignisign.api.documents.initialize` | `write` | Initialize a document descriptor for a signature request |
| `documents.provideJsonContent` | `ignisign.api.documents.provideJsonContent` | `write` | Provide structured JSON data content for a document |
| `documents.providePrivateContent` | `ignisign.api.documents.providePrivateContent` | `write` | Provide SHA-256 document hash for private client-side managed documents |
| `documents.remove` | `ignisign.api.documents.remove` | `destructive` | Delete a document and its associated records |
| `documents.removeContent` | `ignisign.api.documents.removeContent` | `destructive` | Remove document content while preserving the document descriptor |
| `documents.update` | `ignisign.api.documents.update` | `write` | Update document metadata and display template settings |
| `logCapsules.create` | `ignisign.api.logCapsules.create` | `write` | Create a timestamped log capsule for tamper-proof data verification |
| `proofs.downloadLowLevelSignatureProof` | `ignisign.api.proofs.downloadLowLevelSignatureProof` | `read` | Download cryptographic low-level proof file for a specific signer |
| `proofs.downloadSignatureByType` | `ignisign.api.proofs.downloadSignatureByType` | `read` | Download signature proof bundle by proof type (e.g. signed PDF or legal kit) |
| `seal.signM2M` | `ignisign.api.seal.signM2M` | `write` | Perform automated machine-to-machine (M2M) document sealing |
| `signatureRequests.close` | `ignisign.api.signatureRequests.close` | `write` | Close an active or expired signature request |
| `signatureRequests.createInOneCall` | `ignisign.api.signatureRequests.createInOneCall` | `write` | Create, configure and publish a signature request in a single call |
| `signatureRequests.getContext` | `ignisign.api.signatureRequests.getContext` | `read` | Get full context and details for a signature request |
| `signatureRequests.getStatus` | `ignisign.api.signatureRequests.getStatus` | `read` | Get current status for multiple signature requests |
| `signatureRequests.init` | `ignisign.api.signatureRequests.init` | `write` | Initialize a new empty signature request draft |
| `signatureRequests.initSignerSetup` | `ignisign.api.signatureRequests.initSignerSetup` | `write` | Initialize a signer setup session |
| `signatureRequests.list` | `ignisign.api.signatureRequests.list` | `read` | List signature requests for an application and environment |
| `signatureRequests.publish` | `ignisign.api.signatureRequests.publish` | `write` | Publish and launch a signature request to begin signing |
| `signatureRequests.update` | `ignisign.api.signatureRequests.update` | `write` | Update signature request settings, signers, and documents |
| `signatures.get` | `ignisign.api.signatures.get` | `read` | Get details of a specific signature on a document |
| `signatures.getImages` | `ignisign.api.signatures.getImages` | `read` | Get visual signature images associated with document signers |
| `signatures.list` | `ignisign.api.signatures.list` | `read` | List all signatures recorded on a document |
| `signerProfiles.get` | `ignisign.api.signerProfiles.get` | `read` | Get signer profile configuration by ID |
| `signerProfiles.getInputsNeeded` | `ignisign.api.signerProfiles.getInputsNeeded` | `read` | Get required and optional input constraints for a signer profile |
| `signerProfiles.list` | `ignisign.api.signerProfiles.list` | `read` | List signer profiles configured for an application environment |
| `signers.create` | `ignisign.api.signers.create` | `write` | Create a new signer in an application environment |
| `signers.getDetails` | `ignisign.api.signers.getDetails` | `read` | Get detailed signer profile including verified claims and signature requests |
| `signers.getSummary` | `ignisign.api.signers.getSummary` | `read` | Get signer summary information |
| `signers.list` | `ignisign.api.signers.list` | `read` | List signers with pagination |
| `signers.regenerateAuthSecret` | `ignisign.api.signers.regenerateAuthSecret` | `write` | Regenerate authentication secret for a signer |
| `signers.revoke` | `ignisign.api.signers.revoke` | `destructive` | Revoke a signer and their active signature sessions |
| `signers.search` | `ignisign.api.signers.search` | `read` | Search signers by name, email or external ID |
| `signers.update` | `ignisign.api.signers.update` | `write` | Update signer profile inputs and attributes |
| `userInvitations.cancel` | `ignisign.api.userInvitations.cancel` | `destructive` | Cancel an active user invitation |
| `userInvitations.edit` | `ignisign.api.userInvitations.edit` | `write` | Update environment roles for an invited application user |
| `userInvitations.invite` | `ignisign.api.userInvitations.invite` | `write` | Invite a new collaborator to an application with environment roles |
| `userInvitations.list` | `ignisign.api.userInvitations.list` | `read` | List pending and accepted user invitations for an application |
| `userInvitations.resend` | `ignisign.api.userInvitations.resend` | `write` | Resend invitation email to an invited user |

## Auth

Auth: API key. Corsair prompts your tenant for credentials on first use.

## Webhooks

No webhooks.

## Reference

Full docs, types, and examples: https://docs.corsair.dev/plugins/ignisign

## License

Apache-2.0
