/**
 * 放置机器的土地
 * @author anj
 */
class MachinelandItemRenderer extends EarthItemRenderer{

    public constructor() {
        super();
    }

    public onAdd(data?: any): void {
    }

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}