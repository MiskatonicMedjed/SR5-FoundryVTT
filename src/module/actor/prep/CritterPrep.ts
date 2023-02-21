import { CharacterPrep } from './CharacterPrep';
import {InitiativePrep} from './functions/InitiativePrep';
import {ModifiersPrep} from './functions/ModifiersPrep';
import {MatrixPrep} from './functions/MatrixPrep';
import {ItemPrep} from './functions/ItemPrep';
import {SkillsPrep} from './functions/SkillsPrep';
import {LimitsPrep} from './functions/LimitsPrep';
import {ConditionMonitorsPrep} from './functions/ConditionMonitorsPrep';
import {MovementPrep} from './functions/MovementPrep';
import {WoundsPrep} from './functions/WoundsPrep';
import {AttributesPrep} from './functions/AttributesPrep';
import {SR5ItemDataWrapper} from "../../data/SR5ItemDataWrapper";
import CritterData = Shadowrun.CritterData;


export class CritterPrep {
    static prepareBaseData(system: CritterData) {
        ModifiersPrep.prepareModifiers(system);
        ModifiersPrep.clearAttributeMods(system);
        ModifiersPrep.clearArmorMods(system);
        ModifiersPrep.clearLimitMods(system);
    }

    static prepareDerivedData(system: CritterData, items: SR5ItemDataWrapper[]) {
        AttributesPrep.prepareAttributes(system);
        SkillsPrep.prepareSkills(system);

        ItemPrep.prepareArmor(system, items);
        ItemPrep.prepareBodyware(system, items);

        MatrixPrep.prepareMatrix(system, items);
        MatrixPrep.prepareMatrixToLimitsAndAttributes(system);

        // Limits depend on attributes and active effects.
        LimitsPrep.prepareLimitBaseFromAttributes(system);
        LimitsPrep.prepareLimits(system);
        LimitsPrep.prepareDerivedLimits(system);

        ConditionMonitorsPrep.preparePhysical(system);
        ConditionMonitorsPrep.prepareStun(system);

        MovementPrep.prepareMovement(system);
        WoundsPrep.prepareWounds(system);

        InitiativePrep.prepareMeatspaceInit(system);
        InitiativePrep.prepareAstralInit(system);
        InitiativePrep.prepareMatrixInit(system);
        InitiativePrep.prepareCurrentInitiative(system);

        CharacterPrep.prepareRecoil(system);
        CharacterPrep.prepareRecoilCompensation(system);
    }
}