import {EntityItem} from '../entities';
import PositionComponent from './components/position';
import GlobalContext, {LocalContext, ScreenType} from '../context';
import {EventType} from '../events';
import StyledCharacterStrategy from '../characters/styled';
import BasicCharacterStrategy from '../characters/basic';

const characterStrategies = {
    [ScreenType.Normal]: new StyledCharacterStrategy(ScreenType.Normal, {
        bold: true,
        fg: 'FCFCFC',
        bg: '333333'
    }),
    [ScreenType.Insert]: new StyledCharacterStrategy(ScreenType.Insert, {
        bold: true,
        fg: '96A537',
        bg: 'FF0000'
    }),
    [ScreenType.MainMenu]: new BasicCharacterStrategy(ScreenType.MainMenu)
};

export default class Mode {
    public entity: EntityItem;
    public position: PositionComponent;

    constructor(context: LocalContext) {

        this.entity = context.store.createNewEntity();

        // TODO: HAHAH 100 hard coded Z? What is this css?
        this.position = new PositionComponent(
            ScreenType.MainMenu,
            1, GlobalContext.display.height - 1, 100,
            true
        );

        this.position.setCharacterStrategy(
          characterStrategies[ScreenType.MainMenu]);

        context.store.attachComponent(this.entity, this.position);
        context.events.on(evt => {
            if (evt.type === EventType.ScreenTypeChanged) {
                this.position.setCharacterStrategy(
                  characterStrategies[context.screen]);
            }
        });
    }
}


