/**
 * 可采摘的土地
 * @author anj
 */
class ResourcelandItemRenderer extends EarthItemRenderer{

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