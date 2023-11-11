// @ts-check
/** @type {import("beachball").BeachballConfig}*/
module.exports = {
	branch: "origin/main",
	disallowedChangeTypes: ["major", "minor", "patch"],
	publish: false,
	changelog: {
		customRenderers: {
			renderEntry: (entry, _renderInfo) => `- ${entry.comment}`
		}
	},
}