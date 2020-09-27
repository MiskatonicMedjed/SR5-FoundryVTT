import CharacterActorData = Shadowrun.CharacterActorData;
import {DataTemplates} from "../../../dataTemplates";

export class NPCPrep {
    // TODO: This is only for dev until it's ready and most of it might solved by migration.
    static prepareNPCData(data: CharacterActorData) {
        if (data.is_npc) {
            NPCPrep.applyMetatypeModifiers(data);
        }
    }

    static applyMetatypeModifiers(data: CharacterActorData) {
        const {metatype} = data;
        const modifiers = DataTemplates.grunt.metatype_modifiers[metatype];
        if (!modifiers) {
            return;
        }


        const {attributes} = data;
        for (const [attId, value] of Object.entries(modifiers.attributes)) {
            if (attributes[attId] !== undefined) {
                const attribute = attributes[attId];
                attribute.mod = attribute.mod.filter(mod => mod.name !== 'SR5.Character.Modifiers.NPCMetatypeAttribute');
                attribute.mod.push(NPCPrep.AddNPCMetatypeAttributeModifier(value));
            }
        }
    }

    static AddNPCMetatypeAttributeModifier(value) {
        return {
            name: 'SR5.Character.Modifiers.NPCMetatypeAttribute',
            value: value as number
        }
    }
}